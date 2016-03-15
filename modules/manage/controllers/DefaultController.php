<?php

namespace app\modules\manage\controllers;

use yii\web\Controller;

class DefaultController extends Controller
{

    public $layout = 'main1';

    public function actionIndex()
    {

        return $this->render('index');
    }

    public function actionStaff()
    {
        return $this->render('staff');
    }

    public function actionStaff_leave()
    {
        return $this->render('staff_leave');
    }

    public function actionMerchant()
    {
        return $this->render('merchant');
    }

    public function actionMerchant_delete()
    {
        return $this->render('merchant_delete');
    }

    public function actionTeamStaff()
    {
        return $this->render('team/staff');
    }
}
