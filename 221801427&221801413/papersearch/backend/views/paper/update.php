<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model common\models\Paper */

$this->title = '修改论文: ' . $model->title;
$this->params['breadcrumbs'][] = ['label' => '论文管理', 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->title, 'url' => ['view', 'id' => $model->id]];
//$this->params['breadcrumbs'][] = '修改';
?>
<div class="paper-update">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
