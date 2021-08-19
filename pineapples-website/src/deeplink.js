function detectDevice( ) {
	if ( navigator.userAgent.match( /Android/i ) || navigator.userAgent.match( /iPhone/i ) || navigator.userAgent.match( /iPad/i ) ) {
		return 'https://metamask.app.link/dapp/pineapplesdayout.com'
	}
	else {
		return 'https://pineapplesdayout.com'
	}
}
window.location.href = detectDevice( )