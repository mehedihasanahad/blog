<div class="lg:w-[1200px] lg:m-auto px-2">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2.5 pt-16 pb-12">
        <div>
            <h1 class="font-bold text-xl">Social</h1>
            <br/>
            <a href="javascript:void(0)" class="flex">
                <div class="p-2 bg-sky-200 rounded-full mb-2">
                    <img class="w-4" src="{{asset('assets/static/images/facebook.svg')}}"/></div>
                <p class="ml-2">Facebook</p>
            </a>
            <a href="javascript:void(0)" class="flex">
                <div class="p-2 bg-sky-200 rounded-full">
                    <img class="w-4" src="{{asset('assets/static/images/twitter.svg')}}"/>
                </div>
                <p class="ml-2">Twitter</p>
            </a>
        </div>
        <div>
            <h1 class="font-bold text-xl">Latest posts</h1>
            <br/>
            @php
                $letestblogs = \App\Models\Blog::where(['status' => 1,])->orderByDesc('id')->limit(3)->get(['id', 'title', 'small_img', 'content_type']);
            @endphp
            @foreach($letestblogs as $bIndex => $latestBlog)
                <article class="flex gap-x-1 mb-6">
                    <img class="w-20 h-20 object-cover rounded-md" src="{{url($latestBlog->small_img)}}">
                    <h3 class="ml-2">
                        <a href="{{route('blog', ['id' => Crypt::encryptString($latestBlog->id), 'content_type' => $latestBlog->content_type])}}" class="decoration-pink-500 hover:underline underline-offset-4 decoration-2 overflow-ellipsis line-clamp-2">
                            {{$latestBlog->title}}
                        </a>
                        <div>
                            <svg class="h-4 w-4 inline-block opacity-50 mr-1.5" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="64px" height="64px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve">
                                        <g>
                                            <path fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" d="M53.92,10.081   c12.107,12.105,12.107,31.732,0,43.838c-12.106,12.108-31.734,12.108-43.84,0c-12.107-12.105-12.107-31.732,0-43.838   C22.186-2.027,41.813-2.027,53.92,10.081z"/>
                                            <polyline fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" points="32,12 32,32 41,41  "/>
                                            <line fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" x1="4" y1="32" x2="8" y2="32"/>
                                            <line fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" x1="56" y1="32" x2="60" y2="32"/>
                                            <line fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" x1="32" y1="60" x2="32" y2="56"/>
                                            <line fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" x1="32" y1="8" x2="32" y2="4"/>
                                        </g>
                                    </svg>
                            <span class="font-thin text-sm text-slate-400">4 min read</span>
                        </div>
                    </h3>
                </article>
            @endforeach
        </div>
        <div>
            <h1 class="font-bold text-xl">Tags</h1>
            <br/>
            <div class="flex gap-2 flex-wrap">
                @php
                    $footerTag = \App\Models\Tag::where('status', 1)->get();
                @endphp
                @each('subviews.component.bullet_tag', $footerTag, 'tag')
            </div>
        </div>
    </div>
    <p class="pb-8">
        &copy; 2023 Learn - All right Reserved. Proudly Published with Ghost
    </p>
</div>
