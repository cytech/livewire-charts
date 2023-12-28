<?php


namespace Asantibanez\LivewireCharts\Models;

use Illuminate\Support\Collection;

/**
 * Class TimelineChartModel
 * @package Asantibanez\LivewireCharts\Models
 * @property boolean $isMultiLine
 */
class TimelineChartModel extends BaseChartModel
{
    public $isMultiLine;

    public $data;

    public $markers;

    public $onPointClickEventName;

    public function __construct()
    {
        parent::__construct();

        $this->isMultiLine = false;

        $this->onPointClickEventName = null;

        $this->data = collect();

        $this->markers = collect();
    }

    public function multiLine()
    {
        $this->isMultiLine = true;

        $this->data = collect();

        return $this;
    }

    public function singleLine()
    {
        $this->isMultiLine = false;

        $this->data = collect();

        return $this;
    }

    public function addPoint($title, $svalue, $evalue, $extras = [])
    {
        $this->data->push([
            'x' => $title,
            'y' => [$svalue, $evalue],
            'fillColor' => $extras['color'] ?? '#0000FF',
            'strokeColor' => $extras['color'] ?? '#0000FF',
            'extras' => $extras,
        ]);

        return $this;
    }

    public function addSeriesPoint($seriesName, $title, $value, $extras = [])
    {
        $series = $this->data->get($seriesName, collect());

        $series->push([
            'seriesName' => $seriesName,
            'title' => $title,
            'value' => $value,
            'extras' => $extras,
        ]);

        $this->data->put($seriesName, $series);

        return $this;
    }

    public function addMarker($title,
                              $value,
                              $strokeColor = 'green',
                              $text = '',
                              $textColor = '#ffffff',
                              $textBackgroundColor = '#cccccc')
    {
        $this->markers->push([
            'title' => $title,
            'value' => $value,
            'strokeColor' => $strokeColor,
            'text' => $text,
            'textColor' => $textColor,
            'textBackgroundColor' => $textBackgroundColor,
        ]);

        return $this;
    }

    public function withOnPointClickEvent($onPointClickEventName)
    {
        $this->onPointClickEventName = $onPointClickEventName;

        return $this;
    }

    public function toArray()
    {
        return array_merge(parent::toArray(), [
            'isMultiLine' => $this->isMultiLine,
            'onPointClickEventName' => $this->onPointClickEventName,
            'data' => $this->data->toArray(),
            'markers' => $this->markers->toArray(),
        ]);
    }

    public function fromArray($array)
    {
        parent::fromArray($array);

        $this->isMultiLine = data_get($array, 'isMultiLine', false);

        $this->onPointClickEventName = data_get($array, 'onPointClickEventName', null);

        $this->data = collect(data_get($array, 'data', []));

        $this->markers = collect(data_get($array, 'markers', []));
    }
}