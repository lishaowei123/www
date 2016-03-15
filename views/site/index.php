<?php
/* @var $this yii\web\View */
use app\assets\AppAsset;

$this->title = '测试首页';
AppAsset::addScript($this, 'js/jquery-2.2.1.min.js');
AppAsset::addScript($this, 'js/test.js');
//	AppAsset::addCss($this, 'css/default.css');
?>


<div class="container">
    <div class="jumbotron">
        <h1>PHP</h1>
        <p>这是一个超大屏幕（Jumbotron）的实例。</p>
        <p><a class="btn btn-primary btn-lg" role="button">
                学习更多</a>
        </p>
    </div>
</div>
