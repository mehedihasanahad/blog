@extends('Frontend.layout.layout')
@section('title', $blog->title)
@section('pages')
    @php
        $template_type = $blog->template;
    @endphp
    <div class="mt-10">
        @includeIf('Frontend.subviews.template.default')
    </div>
@endsection
