<?php

/* @var $this \yii\web\View */
/* @var $content string */

use yii\helpers\Html;
use app\assets\AppAsset;

AppAsset::register($this);
AppAsset::addScript($this, 'js/jquery-2.2.1.min.js');
AppAsset::addScript($this, 'manage/js/plugins/jquery/jquery-ui.min.js');
AppAsset::addScript($this, 'manage/js/plugins/bootstrap/bootstrap.min.js');
AppAsset::addScript($this, 'manage/js/plugins/icheck/icheck.min.js');
AppAsset::addScript($this, 'manage/js/plugins/mcustomscrollbar/jquery.mCustomScrollbar.min.js');
AppAsset::addScript($this, 'manage/js/plugins/blueimp/jquery.blueimp-gallery.min.js');
AppAsset::addScript($this, 'manage/js/plugins/bootstrap/bootstrap-datepicker.js');
AppAsset::addScript($this, 'manage/js/plugins/bootstrap/bootstrap-timepicker.min.js');
AppAsset::addScript($this, 'manage/js/plugins/bootstrap/bootstrap-file-input.js');
AppAsset::addScript($this, 'manage/js/plugins/bootstrap/bootstrap-select.js');
AppAsset::addScript($this, 'manage/js/plugins/validationengine/languages/jquery.validationEngine-en.js');
AppAsset::addScript($this, 'manage/js/plugins/validationengine/jquery.validationEngine.js');
AppAsset::addScript($this, 'manage/js/plugins/jquery-validation/jquery.validate.js');
AppAsset::addScript($this, 'manage/js/plugins/maskedinput/jquery.maskedinput.min.js');
AppAsset::addScript($this, 'manage/js/plugins/plugins.js');
AppAsset::addScript($this, 'manage/js/plugins/actions/actions.js');
AppAsset::addScript($this, 'manage/js/common/common.js');
AppAsset::addScript($this, 'js/tools.js');


?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <link rel="stylesheet" href="/manage/css/common/theme-default.css"/>
    <link rel="stylesheet" href="/manage/css/common/common.css"/>
    <?= Html::csrfMetaTags() ?>
    <title><?= Html::encode($this->title) ?></title>
</head>
<body>
<?php $this->beginBody() ?>
<div class="page-container">
    <!-- START PAGE SIDEBAR -->
    <div class="page-sidebar">
        <!-- START X-NAVIGATION -->
        <ul class="x-navigation">
            <li class="xn-logo">
                <a href="index.html">ATLANT</a>
                <a href="#" class="x-navigation-control"></a>
            </li>
            <li class="xn-profile">
                <a href="#" class="profile-mini">
                    <img src="http://s.wasu.tv/mams/pic/201505/07/15/20150507154106728a69b8ee7.jpg" alt="John Doe"/>
                </a>
                <div class="profile">
                    <div class="profile-image">
                        <img src="http://s.wasu.tv/mams/pic/201505/07/15/20150507154106728a69b8ee7.jpg" alt="John Doe"/>
                    </div>
                    <div class="profile-data">
                        <div class="profile-data-name">嗨小冷</div>
                    </div>
                </div>
            </li>
            <li class="xn-title">基础管理</li>
            <li class="xn-openable">
                <a> <span class="fa fa fa-list"></span><span class="xn-text">员工管理</span></a>
                <ul>
                    <li><a href="staff"><span class="fa fa fa-th-list"></span> 员工列表</a></li>
                    <li><a href="staff_leave"><span class="fa fa fa-th-list"></span> 离职员工列表</a></li>
                </ul>
            </li>
            <li class="xn-openable">
                <a href="#"> <span class="fa fa fa-list"></span><span class="xn-text">团队管理</span></a>
                <ul>
                    <li><a href=""><span class="fa fa fa-th-list"></span> 团队列表</a></li>
                    <li><a href=""><span class="fa fa fa-th-list"></span> 已删除团队列表</a></li>
                    <li><a href=""><span class="fa fa fa-th-list"></span> 团队管理</a></li>
                    <li><a href=""><span class="fa fa fa-th-list"></span> 团队商家管理</a></li>
                </ul>
            </li>
            <li class="xn-openable">
                <a href="#"> <span class="fa fa fa-list"></span><span class="xn-text">商家管理</span></a>
                <ul>
                    <li><a href="merchant"><span class="fa fa fa-th-list"></span> 商家列表</a></li>
                    <li><a href="merchant_delete"><span class="fa fa fa-th-list"></span> 已删除商家列表</a></li>
                </ul>
            </li>
        </ul>
        <!-- END X-NAVIGATION -->
    </div>
    <!-- END PAGE SIDEBAR -->
    <div class="page-content" id="page_content">
        <ul class="x-navigation x-navigation-horizontal x-navigation-panel">
            <li class="xn-icon-button"><a href="#" class="x-navigation-minimize"><span
                        class="fa fa-dedent"></span></a></li>
            <li class="xn-icon-button pull-right last"><a href="#"><span class="fa fa-power-off"></span></a>
                <ul class="xn-drop-left animated zoomIn" style="position: fixed; z-index: 9999;">
                    <li><a href="#" class="mb-control" data-box="#mb-signout"><span class="fa fa-sign-out"></span>
                            退出</a>
                    </li>
                </ul>
            </li>
        </ul>
        <?= $content; ?>
    </div>
</div>
<div class="message-box animated fadeIn" data-sound="alert" id="mb-signout">
    <div class="mb-container">
        <div class="mb-middle">
            <div class="mb-title">
                <span class="fa fa-sign-out"></span> 确定
                <strong>退出</strong> ?
            </div>
            <div class="mb-content">
                <p>你确定要退出后台管理系统?</p>
            </div>
            <div class="mb-footer">
                <div class="pull-right">
                    <a href="/manage/logout" class="btn btn-success btn-lg">确认退出</a>
                    <button class="btn btn-default btn-lg mb-control-close">取消</button>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- success -->
<div class="message-box message-box-success animated fadeIn" id="message-box-success">
    <div class="mb-container">
        <div class="mb-middle">
            <div class="mb-title"><span class="fa fa-check"></span><span class="mb-span"></span></div>
            <div class="mb-content">
                <p class="mb-p"></p>
            </div>
            <div class="mb-footer">
                <button class="btn btn-default btn-lg pull-right mb-control-close">关闭</button>
            </div>
        </div>
    </div>
</div>
<!-- end success -->
<!-- danger -->
<div class="message-box message-box-danger animated fadeIn" id="message-box-danger">
    <div class="mb-container">
        <div class="mb-middle">
            <div class="mb-title"><span class="fa fa-times"></span><span class="mb-span"></span></div>
            <div class="mb-content">
                <p class="mb-p"></p>
            </div>
            <div class="mb-footer">
                <button class="btn btn-default btn-lg pull-right mb-control-close">关闭</button>
            </div>
        </div>
    </div>
</div>
<!-- end danger -->
<!--确认框-->
<div class="mask" style="display: none;"></div>
<div class="refund-container container confirm-dialog" style="display: none;">
    <div class="refund-content content">
        <div class="row">
            <div class="col-sm-12">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title confirm-title"></h3>
                        <a title="关闭" class="pop_closed close-container"></a>
                    </div>
                    <div class="panel-body">

                        <div class="text-center confirmDiv">
                            <button class="btn btn-danger to-confirm toConfirm" data-action="" type="button">确认</button>
                            <button class="btn btn-default toCancel close-container" type="button">取消</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!--确认框-->
<div id="blueimp-gallery" class="blueimp-gallery blueimp-gallery-controls">
    <div class="slides"></div>
    <h3 class="title"></h3>
    <a class="prev">‹</a>
    <a class="next">›</a>
    <a class="close">×</a>
    <a class="play-pause"></a>
    <ol class="indicator"></ol>
</div>
<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>


