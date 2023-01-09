const exit = new LogoutButton();
exit.action = function request() {
    ApiConnector.logout(callback);
    function callback(){
        location.reload();
    }
}

ApiConnector.current(user)
function user(res){
    ProfileWidget.showProfile(res.data);
}

const currentRate = new RatesBoard();
let isCooldown = true;
function getCurrentRate() {
    ApiConnector.getStocks(callback)
    function callback(res){
        currentRate.clearTable();
        currentRate.fillTable(res.data);
    }
}
if(isCooldown){
    isCooldown = false;
    getCurrentRate();
    setInterval(getCurrentRate, 60000);
}

const money = new MoneyManager();
money.addMoneyCallback = (addMoney) => {
    ApiConnector.addMoney(addMoney, callback);
    function callback(res) {
        if(res.success == true){
            message = `Операция по пополнению баланса прошла успешно`;
        } else if (res.success === false){
            message = res.error; 
        }
        money.setMessage(res.success, message);
        ProfileWidget.showProfile(res.data);
    }  
}
money.conversionMoneyCallback = (convertMoney) => {
    ApiConnector.convertMoney(convertMoney, callback);
    function callback(res){
        if(res.success == true){
            message = `Операция по конвертации прошла успешно`;
        } else if (res.success === false){
            message = res.error;
        }
        money.setMessage(res.success, message);
        ProfileWidget.showProfile(res.data);
    }
}
money.sendMoneyCallback = (transferMoney) => {
    ApiConnector.transferMoney(transferMoney, callback);
    function callback(res){
        if(res.success == true){
            message = `Перевод выполнен успешно`;
        } else if (res.success === false){
            message = res.error;
        }
        money.setMessage(res.success, message);
        ProfileWidget.showProfile(res.data);
    }
}

const favorites = new FavoritesWidget();
ApiConnector.getFavorites(favoritesUser);
function favoritesUser(users){
    favorites.clearTable();
    favorites.fillTable(users.data);
    money.updateUsersList(users.data); 
}
favorites.addUserCallback = (users) =>{
    ApiConnector.addUserToFavorites(users, callback);
    function callback(data){
        console.log(data)
        if(data.success){
            favorites.clearTable();
            favorites.fillTable(data.data);
            money.updateUsersList(data.data); 
            message = `Данный пользователь добавлен в "Адресную книгу"`;
        } else if (!data.success){
            message = data.error;
        }
        favorites.setMessage(data.success, message);
    }
}
favorites.removeUserCallback = (users) => {
    ApiConnector.removeUserFromFavorites(users, callback);
    function callback(data){
        console.log(data)
        if(data.success){
            message = `Данный пользователь удален из "Адресной книги"`;
            favorites.clearTable();
            favorites.fillTable(data.data);
            money.updateUsersList(data.data);
        } else if (!data.success){
            message = data.error;
        } 
        favorites.setMessage(data.success, message);
    }
}