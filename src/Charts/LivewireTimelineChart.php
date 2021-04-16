<?php

namespace Asantibanez\LivewireCharts\Charts;

use Asantibanez\LivewireCharts\Models\TimelineChartModel;
use Livewire\Component;

/**
 * Class LivewireTimelineChart
 * @package Asantibanez\LivewireCharts\Charts
 */
class LivewireTimelineChart extends Component
{
    public $timelineChartModel;

    public function mount(TimelineChartModel $timelineChartModel)
    {
        $this->timelineChartModel = $timelineChartModel->toArray();
    }

    public function onPointClick($point)
    {
        $onPointClickEventName = data_get($this->timelineChartModel, 'onPointClickEventName', null);

        if ($onPointClickEventName === null) {
            return;
        }

        $this->emit($onPointClickEventName, $point);
    }

    public function render()
    {
        if ($this->timelineChartModel['isMultiLine']) {
            return view('livewire-charts::livewire-multi-timeline-chart');
        }

        return view('livewire-charts::livewire-timeline-chart');
    }
}
