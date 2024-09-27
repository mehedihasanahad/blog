@extends('layout.layout')
@section('title', $blog->title)
@section('pages')
    @php
        $template_type = $blog->template;
    @endphp
    <div class="mt-10">
        @if($template_type == 2)
{{--            @includeIf('subviews.template.list')--}}
            @includeIf('subviews.template.listV2')
        @else
            @includeIf('subviews.template.default')
        @endif
    </div>
@endsection
