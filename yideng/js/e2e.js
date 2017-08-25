var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

driver.get('http://127.0.0.1:8000/yideng/');
driver.findElement(By.id('container')).click();
driver.wait(until.titleIs('大拇指点赞'), 5000);
driver.quit();