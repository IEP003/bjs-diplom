const exit = new LogoutButton();

exit.action = () => {
    ApiConnector.logout(response => {
        if(response.success) {
            location.reload();
        }
    })
}

ApiConnector.current((response) => {
    if(response.success){
        ProfileWidget.showProfile(response.data);
    }  
})


const currentRate = new RatesBoard();
function getCurrentRate() {
    ApiConnector.getStocks((response) => {
        if(response.success){
            currentRate.clearTable();
            currentRate.fillTable(response.data);
        }
    })
}
getCurrentRate();
setInterval(getCurrentRate, 60000);

const money = new MoneyManager();

money.addMoneyCallback = (addMoney) => {
    ApiConnector.addMoney(addMoney, (response) => {
        if(response.success){
            ProfileWidget.showProfile(response.data);
        }
        money.setMessage(response.success, response.success ? 'Операция по пополнению баланса прошла успешно' : response.error);
    });
        
}

money.conversionMoneyCallback = (convertMoney) => {
    ApiConnector.convertMoney(convertMoney, (response) => {
        if(response.success){
            ProfileWidget.showProfile(response.data);
        }
        money.setMessage(response.success, response.success ? 'Операция по конвертации прошла успешно' : response.error);
    });
}

money.sendMoneyCallback = (transferMoney) => {
    ApiConnector.transferMoney(transferMoney, (response) => {
        if(response.success){
            message = `Перевод выполнен успешно`;
            ProfileWidget.showProfile(response.data);
        }
        money.setMessage(response.success, response.success ? 'Перевод выполнен успешно' : response.error);
    });
}

const favorites = new FavoritesWidget();

ApiConnector.getFavorites((response) => {
    favorites.clearTable();
    favorites.fillTable(response.data);
    money.updateUsersList(response.data)
});

favorites.addUserCallback = (users) => {
    ApiConnector.addUserToFavorites(users, (response) => {
        if(response.success) {
            favorites.clearTable();
            favorites.fillTable(response.data);
            money.updateUsersList(response.data); 
        }
        favorites.setMessage(response.success, response.success ? 'Данный пользователь добавлен в "Адресную книгу"' : response.error);
    });
}
favorites.removeUserCallback = (users) => {
    ApiConnector.removeUserFromFavorites(users, (response) => {
        if(response.success){
            favorites.clearTable();
            favorites.fillTable(response.data);
            money.updateUsersList(response.data);
        }
        favorites.setMessage(response.success, response.success ? 'Данный пользователь добавлен в "Адресную книгу"' : response.error);
    });
}