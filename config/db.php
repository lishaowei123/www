<?php

return [
    'class' => 'yii\db\Connection',
    'dsn' => 'mysql:host=localhost;dbname=test',
    'username' => 'root',
    'password' => '',
    'charset' => 'utf8',
    // 配置主服务器
//    'masterConfig' => [
//        'username' => 'root',
//        'password' => '',
//        'attributes' => [
//            // use a smaller connection timeout
//            PDO::ATTR_TIMEOUT => 10,
//        ],
//    ],
//
//    // 配置主服务器组
//    'masters' => [
//        ['dsn' => 'mysql:host=localhost;dbname=test'],
//        ['dsn' => 'mysql:host=localhost;dbname=demo'],
//    ],
//
//    // 配置从服务器
//    'slaveConfig' => [
//        'username' => 'root',
//        'password' => '',
//        'attributes' => [
//            // use a smaller connection timeout
//            PDO::ATTR_TIMEOUT => 10,
//        ],
//    ],
//
//    // 配置从服务器组
//    'slaves' => [
//        ['dsn' => 'mysql:host=localhost;dbname=test'],
//        ['dsn' => 'mysql:host=localhost;dbname=demo']
//    ],
];
