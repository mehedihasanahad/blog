<div class="flex justify-between lg:w-[1200px] xl:w-[90%] max-w-[1600px] lg:m-auto px-2" title="flower">
    <a href="{{URL::to('/')}}" id="logo" class="flex items-center">
        <img class="h-24 w-24 object-contain" src="{{asset('assets/static/images/logo.png')}}" alt="">
        <h1 class="text-3xl">WᵣᵢₜₑWₐᵥₑy</h1>
    </a>
    <nav>
        <ul class="h-full flex justify-center items-center [&_li]:cursor-pointer font-bold text-lg">
            <li class="mr-4">
                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-4"><path d="m16.822 18.813 4.798 4.799c.262.248.61.388.972.388.772-.001 1.407-.637 1.407-1.409 0-.361-.139-.709-.387-.971l-4.799-4.797c3.132-4.108 2.822-10.005-.928-13.756l-.007-.007-.278-.278a.6985.6985 0 0 0-.13-.107C13.36-1.017 7.021-.888 3.066 3.067c-4.088 4.089-4.088 10.729 0 14.816 3.752 3.752 9.65 4.063 13.756.93Zm-.965-13.719c2.95 2.953 2.95 7.81 0 10.763-2.953 2.949-7.809 2.949-10.762 0-2.951-2.953-2.951-7.81 0-10.763 2.953-2.95 7.809-2.95 10.762 0Z"></path></svg>
            </li>
            <li><a href="{{route('login')}}">Sign in</a></li>
        </ul>
    </nav>
</div>
