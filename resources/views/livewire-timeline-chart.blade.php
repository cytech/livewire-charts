<div
    style="width: 100%; height: 100%;"
    id="timelinechart"
    x-data="{ ...livewireChartsTimelineChart() }"
    x-init="init()"
>
    <div wire:ignore x-ref="container"></div>
</div>
{{--<style>--}}
{{--    /*@import url('https://fonts.googleapis.com/css?family=Poppins');*/--}}

{{--    /** {*/--}}
{{--    /*    font-family: 'Poppins', sans-serif;*/--}}
{{--    /*}*/--}}

{{--    #timelinechart {--}}
{{--        /*max-width: 760px;*/--}}
{{--        /*margin: 35px auto;*/--}}
{{--        /*opacity: 0.9;*/--}}
{{--    }--}}

{{--    .arrow_box {--}}
{{--        position: relative;--}}
{{--        background: lightslategrey;--}}
{{--        border: 2px solid #000000;--}}
{{--    }--}}
{{--    /*.arrow_box:after, .arrow_box:before {--}}
{{--        right: 100%;--}}
{{--        top: 50%;--}}
{{--        border: solid transparent;--}}
{{--        content: " ";--}}
{{--        height: 0;--}}
{{--        width: 0;--}}
{{--        position: absolute;--}}
{{--        pointer-events: none;--}}
{{--    }--}}

{{--    .arrow_box:after {--}}
{{--        border-color: rgba(85, 85, 85, 0);--}}
{{--        border-right-color: #555;--}}
{{--        border-width: 10px;--}}
{{--        margin-top: -10px;--}}
{{--    }--}}
{{--    .arrow_box:before {--}}
{{--        border-color: rgba(0, 0, 0, 0);--}}
{{--        border-right-color: #000000;--}}
{{--        border-width: 13px;--}}
{{--        margin-top: -13px;--}}
{{--    }*/--}}

{{--    #timelinechart .apexcharts-tooltip {--}}
{{--        color: #fff;--}}
{{--        /*transform: translateX(10px) translateY(10px);*/--}}
{{--        overflow: visible !important;--}}
{{--        white-space: normal !important;--}}
{{--    }--}}

{{--    #timelinechart .apexcharts-tooltip span {--}}
{{--        padding: 5px 10px;--}}
{{--        display: inline-block;--}}
{{--    }--}}
{{--</style>--}}
