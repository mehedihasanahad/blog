<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>@yield('title')</title>
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body class="bg-slate-50 font-regular">
    <header id="header" class="h-fit mt-4 lg:mt-10 sticky top-0 z-50 pb-2">
        @includeIf('subviews.layout.header')
    </header>

    <main>
        <section class="lg:w-[1200px] xl:w-[90%] max-w-[1600px] lg:m-auto px-2">
            @yield('pages')
        </section>
    </main>

    <footer class="bg-white">
        @includeIf('subviews.layout.footer')
    </footer>

    {{--scripts--}}
    <script type="module" src="{{mix('/js/app.js')}}"></script>
    <script src="{{asset('assets/scripts/js/axios-1.4.0.min.js')}}"></script>
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
