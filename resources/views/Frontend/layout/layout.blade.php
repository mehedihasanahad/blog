<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="description" content="@yield('description')">
    <title>@yield('title')</title>
    <link rel="canonical" href="@yield('canonical_url')">
    <link rel="icon" type="image/x-icon" href="{{asset('assets/static/images/logo.png')}}"/>
    @vite('resources/css/app.css')
</head>
<body class="bg-slate-50 font-regular">
    <header id="header" class="h-fit mt-4 lg:mt-10 sticky top-0 z-50 pb-2">
        @includeIf('Frontend.subviews.layout.header')
    </header>

    <main>
        <section class="lg:w-[1200px] xl:w-[90%] max-w-[1600px] lg:m-auto px-2">
            @yield('pages')
        </section>
    </main>

    <footer class="bg-white">
        @includeIf('Frontend.subviews.layout.footer')
    </footer>

    {{--scripts--}}
    <script src="{{asset('assets/scripts/js/axios-1.4.0.min.js')}}"></script>
    <script src="{{asset('assets/scripts/alpine@3.14.1.min.js')}}" defer></script>
    <script src="{{asset('assets/js/commonFunction.js')}}"></script>
    <script defer>
        const header = CF.getElementID('header');
        window.addEventListener('scroll', headerStyleToggler);
        window.addEventListener('load', headerStyleToggler);
        function headerStyleToggler() {
            if(window.scrollY >= header.offsetTop)
                header.classList.add('is-pinned');
            else
                header.classList.remove('is-pinned');
        }
    </script>
    @stack('scripts')
</body>
</html>
