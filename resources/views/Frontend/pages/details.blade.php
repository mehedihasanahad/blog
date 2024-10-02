@extends('Frontend.layout.layout')
@section('title', $blog->title)
@section('description', $blog->subtitle)
@section('canonical_url', URL('/'. $blog->slug))
@section('pages')
    @php
        $template_type = $blog->template;
    @endphp
    <div class="mt-10">
        @includeIf('Frontend.subviews.template.default')
    </div>
@endsection
