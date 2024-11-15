const clientId = process.env.REACT_APP_CLIENT_ID;
const redirectUrl = 'http://localhost:3000/';
const scope = 'playlist-modify-private playlist-modify-public';
const authEndpoint = new URL('https://accounts.spotify.com/authorize');
const tokenEndpoint = 'https://accounts.spotify.com/api/token';

const urlParams = new URLSearchParams(window.location.search);
let code = urlParams.get('code');

const currentToken = {
    get access_token() { return localStorage.getItem('access_token') || null; },
    get refresh_token() { return localStorage.getItem('refresh_token') || null },
    get expires_in() { return localStorage.getItem('refresh_in') || null },
    get expires() { return localStorage.getItem('expires') || null },

    save: response => {
        const { access_token, refresh_token, expires_in } = response;
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        localStorage.setItem('expires_in', expires_in);

        const now = new Date();
        const expiry = new Date(now.getTime() + (expires_in * 1000));
        localStorage.setItem('expires', expiry);
    }
};

const getToken = async (code) => {
    let codeVerifier = localStorage.getItem('codeVerifier');

    const response = await fetch(tokenEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id: clientId,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirectUrl,
            code_verifier: codeVerifier,
        }),
    });

    return await response.json();
}

if (code) {
    const token = await getToken(code);
    currentToken.save(token);

    const url = new URL(window.location.href);
    url.searchParams.delete('code');

    const updatedUrl = url.search ? url.href : url.href.replace('?', '');
    window.history.replaceState({}, document.title, updatedUrl);
}

const redirectToSpotifyAuthorize = async () => {
    const generateCodeVerifier = (length) => {
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_.-';
        const values = crypto.getRandomValues(new Uint8Array(length));
        return values.reduce((acc, x) => acc + possible[x % possible.length], '');
    }

    const codeVerifier = generateCodeVerifier(128);
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier)
    const hashed = await crypto.subtle.digest('SHA-256', data);

    const base64Encode = (input) => {
        return btoa(String.fromCharCode(...new Uint8Array(input)))
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');
    }

    const codeChallenge = base64Encode(hashed);

    window.localStorage.setItem('codeVerifier', codeVerifier);

    const params = {
        response_type: 'code',
        client_id: clientId,
        scope: scope,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: redirectUrl,
    };

    authEndpoint.search = new URLSearchParams(params).toString();
    window.location.href = authEndpoint.toString();
}

export const searchSpotify = (searchTerm) => {
    const accessToken = currentToken.access_token;
    return fetch(`https://api.spotify.com/v1/search?type=track,album,artist&q=${searchTerm}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    }).then(response => {
        return response.json();
    }).then(jsonResponse => {
        if (!jsonResponse.tracks) {
            return [];
        }
        return jsonResponse.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            image: track.album.images[0].url,
            uri: track.uri
        }));
    });
}

export const savePlaylistToAccount = (name, trackUri) => {
    if (!name || !trackUri.length) {
        return;
    }

    const accessToken = currentToken.access_token;
    let userId;

    return fetch('https://api.spotify.com/v1/me', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }).then(response => {
        return response.json();
    }).then(jsonResponse => {
        userId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                public: false
            })
        })
    }).then(response => {
        return response.json();
    }).then(jsonResponse => {
        const playlistId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uris: trackUri
            })
        });
    });
};

export default redirectToSpotifyAuthorize