<?php

/* @var $this \yii\web\View */
/* @var $content string */

use app\assets\AppAsset;

AppAsset::register($this);
$this->title = '已删除商家列表';
AppAsset::addScript($this, 'manage/js/merchant/merchant_delete.js');

?>
<link rel="stylesheet" href="/manage/css/merchant/merchant.css"/>
<div class="col-sm-12 pt15">
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">已删除商家列表</h3>
        </div>
        <div class="panel-body">
            <div class="row" style="">
                <div class="col-md-12">
                    <form id="validate" class="form-horizontal">
                        <div class="col-md-4 pull-right">
                            <div class="input-group">
                                <input type="text" class="form-control no-right-border form-focus-purple"
                                       name="keywords" placeholder="请输入姓名、手机号码搜索" value="">
                            <span class="input-group-btn">
                                <button class="btn btn-success btn-search" type="button">搜索</button>
                            </span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="col-md-12 df pt15">
                <div class="col-md-2 left-div">
                    <h4 class="text-center">组织架构</h4>
                    <div>
                        <div class="head-div">
                            <div class="head-name-div df">乐派科技 <span class="fa fa-angle-down"></span></div>
                            <ul class="text-center department">
                                <li class="class-li">团队1</li>
                                <li class="class-li">团队2</li>
                                <li class="class-li">团队3</li>
                                <li class="class-li">团队4</li>
                                <li class="class-li">团队5</li>
                            </ul>
                        </div>

                    </div>
                </div>
                <div class="col-md-10 right-div">
                    <h4 class="text-center">商家列表（<span id="staffItemsNum"></span>）</h4>
                    <div class="panel-body">
                        <div class="table-div">
                            <table class="table table-bordered table-striped" id="example-2" role="grid">
                                <thead>
                                <tr>
                                    <th>商家名称</th>
                                    <th>联系人</th>
                                    <th>电话</th>
                                    <th>所属类型</th>
                                    <th>结算方式</th>
                                    <th>收费标准</th>
                                    <th>删除时间</th>
                                    <th>操作人</th>
                                    <th>删除原因</th>
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>潘师傅红烧肉</td>
                                    <td>张老板</td>
                                    <td>13828480392</td>
                                    <td>餐饮商家</td>
                                    <td>固定价格</td>
                                    <td>5元/单</td>
                                    <td>2015-12-11</td>
                                    <td>王鹏</td>
                                    <td>删除原因</td>
                                    <td>
                                        <a href="#" class="btn btn-info btn-move">查看统计</a>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="page-devide"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--添加员工-->
<div class="container staff-container">
    <div class="row">
        <div class="col-sm-12">
            <form id="validate" class="form-horizontal">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title"></h3>
                        <a title="关闭" class="pop_closed close-container"></a>
                    </div>
                    <div class="panel-body">
                        <div class="form-group">
                            <label class="col-md-3 control-label">姓名：</label>
                            <div class="col-md-7">
                                <input id="name" type="text" placeholder="请输入姓名" class="form-control">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-3 control-label">性别：</label>
                            <div class="col-md-7">
                                <label class="check"><input type="radio" name="gender" value="1"
                                                            class="icheckbox"/>男</label>
                                <label class="check"><input type="radio" name="gender" value="2"
                                                            class="icheckbox"/>女</label>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-3 control-label">手机号码：</label>
                            <div class="col-md-7">
                                <input id="mobile" type="text" placeholder="请输入手机号码" class="form-control">
                            </div>
                        </div>
                        <div class="form-group department-div">
                            <label for="department" class="col-md-3 control-label">科室/部门：</label>
                            <div class="col-md-7">
                                <select id="department" class="form-control select">
                                    <option value="">请选择科室/部门</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-3 control-label">职位：</label>
                            <div class="col-md-7">
                                <input id="job" type="text" placeholder="请输入职位" class="form-control">
                            </div>
                        </div>

                        <div class="text-right">
                            <button title="保存并添加下一个" class="btn btn-info btn-save" type="button" data-action="add">
                                保存并添加下一个
                            </button>
                            <button title="保存" class="btn btn-info btn-save" type="button" data-action="">保存</button>
                            <button title="取消" class="btn btn-default hide close-container btn-cancel" type="button">
                                取消
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

<!--设定团队-->
<div class="container move-container">
    <div class="row">
        <div class="col-sm-12">
            <form id="validate" class="form-horizontal">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title text-center">请选择所属科室/部门</h3>
                        <a title="关闭" class="pop_closed close-container"></a>
                    </div>
                    <div class="panel-body">
                        <div class="form-group">
                            <ul class="department">
                                <!--<li class="class-li">科室部门1</li>
                                <li class="class-li">科室部门2</li>
                                <li class="class-li">科室部门3</li>
                                <li class="class-li">科室部门4</li>
                                <li class="class-li">科室部门5</li>
                                <li class="class-li">科室部门5</li>
                                <li class="class-li">科室部门5</li>
                                <li class="class-li">科室部门5</li>
                                <li class="class-li">科室部门5</li>
                                <li class="class-li">科室部门5</li>
                                <li class="class-li">科室部门5</li>
                                <li class="class-li">科室部门5</li>
                                <li class="class-li">科室部门5</li>-->
                            </ul>
                        </div>

                        <div class="text-center ">
                            <button title="确认" class="btn btn-info btn-confirm" type="button">确认</button>
                            <button title="取消" class="btn btn-default close-container" type="button">取消</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

