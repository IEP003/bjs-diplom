const exit = new LogoutButton();
exit.action = function request() {
    ApiConnector.logout(callback);
    function callback(){
        location.reload();
    }
}

ApiConnector.current(callback)
function callback(){
    ProfileWidget.showProfile()
}


