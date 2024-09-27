@extends('layout.layout')
@section('title', 'Hero Page')
@section('pages')
    <div class="my-2 sm:flex justify-between h-[330px] sm:h-[350px] lg:h-[600px] items-center">
        <h1 class="hidden sm:block text-3xl w-1/2 font-bold text-fuchsia-700">
            THE BEST <span class="text-pink-400">EDUCATION</span> THEME
        </h1>
        <div class="header-svg
        top-[90px] right-[15%] bottom-0 left-[15%]
        sm:top-[108px] sm:right-[4%] sm:left-1/2
        lg:top-[148px] lg:right-[8%] lg:left-1/2">
            @includeIf('subviews.hero-svg')
        </div>
    </div>

    <div class="mt-10">
        <h1 class="text-xl font-semibold tracking-wide">POPULAR TAGS</h1>
        <div class="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-2 mt-2">
            @foreach($tags as $key => $tag)
                <div class="relative hover:-translate-y-1.5 transition-all duration-300 cursor-pointer">
                    <a href="{{URL::to('/tag/'.Crypt::encryptString($tag->id))}}">
                        <img src="{{url('/'.$tag->small_img)}}" class="h-24 w-full object-cover rounded-2xl"/>
                    </a>
                    <h1 class="absolute bottom-[5%] left-[5%] bg-slate-200 py-1 px-3.5 rounded-[20px] font-thin text-sm">
                        {{$tag->name}}
                    </h1>
                </div>
            @endforeach
        </div>
    </div>

    <div class="mt-10">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2">
                @foreach($latestblogs as $blogKey => $blog)
                    <article class="w-full mb-8 bg-white shadow-[1px_1px_10px_2px_rgba(0,0,0,0.1)] rounded-2xl p-6 md:grid grid-cols-5 gap-x-8">
                        {{--blog image--}}
                        <div class="col-span-2 overflow-hidden rounded-2xl">
                            <a href="{{route('blog', ['id' => Crypt::encryptString($blog->id), 'content_type' => $blog->content_type])}}">
                                <img class="w-full h-64 object-cover hover:scale-105 transition duration-500" src="{{url('/'.$blog->small_img)}}">
                            </a>
                        </div>
                        <div class="mt-5 md:mt-0 col-span-3">
                            {{--tag--}}
                            <div class="flex gap-2">
                                @foreach($blog->tag_ids as $blogTagKey => $bgTag)
                                    @foreach($tags as $bTagKey => $bTag)
                                        @if($bTag->id == $bgTag)
                                            @includeIf('subviews.component.bullet_tag', ['tag' => $bTag])
                                        @endif
                                   @endforeach
                                @endforeach
                            </div>
                            {{--title--}}
                            <h1 class="mt-2 text-3xl font-bold">
                                <a href="{{route('blog', ['id' => Crypt::encryptString($blog->id), 'content_type' => $blog->content_type])}}" class="decoration-pink-500 hover:underline underline-offset-4 decoration-2 overflow-ellipsis line-clamp-2">
                                    {{$blog->title}}
                                </a>
                            </h1>
                            {{--sub title--}}
                            <p class="mt-2 overflow-ellipsis line-clamp-3">
                                {{$blog->sub_title}}
                            </p>
                            {{--read time--}}
                            <div class="mt-2 text-slate-400 flex gap-x-4">
                                <time datetime="2022-05-02">
                                    <svg class="h-4 w-4 inline-block opacity-50" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 64 64"><title>calender</title><path d="M35,36H29a1,1,0,0,1-1-1V29a1,1,0,0,1,1-1h6a1,1,0,0,1,1,1v6A1,1,0,0,1,35,36Zm-5-2h4V30H30Z"/><path d="M48,36H42a1,1,0,0,1-1-1V29a1,1,0,0,1,1-1h6a1,1,0,0,1,1,1v6A1,1,0,0,1,48,36Zm-5-2h4V30H43Z"/><path d="M48,46H42a1,1,0,0,1-1-1V39a1,1,0,0,1,1-1h6a1,1,0,0,1,1,1v6A1,1,0,0,1,48,46Zm-5-2h4V40H43Z"/><path d="M35,46H29a1,1,0,0,1-1-1V39a1,1,0,0,1,1-1h6a1,1,0,0,1,1,1v6A1,1,0,0,1,35,46Zm-5-2h4V40H30Z"/><path d="M22,36H16a1,1,0,0,1-1-1V29a1,1,0,0,1,1-1h6a1,1,0,0,1,1,1v6A1,1,0,0,1,22,36Zm-5-2h4V30H17Z"/><path d="M22,46H16a1,1,0,0,1-1-1V39a1,1,0,0,1,1-1h6a1,1,0,0,1,1,1v6A1,1,0,0,1,22,46Zm-5-2h4V40H17Z"/><path d="M52,51H12a5,5,0,0,1-5-5V18a5,5,0,0,1,5-5h4a1,1,0,0,1,1,1v2a2,2,0,0,0,4,0V14a1,1,0,0,1,1-1h7a1,1,0,0,1,1,1v2a2,2,0,0,0,4,0V14a1,1,0,0,1,1-1h7a1,1,0,0,1,1,1v2a2,2,0,0,0,4,0V14a1,1,0,0,1,1-1h4a5,5,0,0,1,5,5V46A5,5,0,0,1,52,51ZM12,15a3,3,0,0,0-3,3V46a3,3,0,0,0,3,3H52a3,3,0,0,0,3-3V18a3,3,0,0,0-3-3H49v1a4,4,0,0,1-8,0V15H36v1a4,4,0,0,1-8,0V15H23v1a4,4,0,0,1-8,0V15Z"/><path d="M56,25H8a1,1,0,0,1,0-2H56a1,1,0,0,1,0,2Z"/><path d="M32,20a4,4,0,0,1-4-4V12a4,4,0,1,1,8,0v4A4,4,0,0,1,32,20Zm0-10a2,2,0,0,0-2,2v4a2,2,0,0,0,4,0V12a2,2,0,0,0-2-2Z"/><path d="M45,20a4,4,0,0,1-4-4V12a4,4,0,1,1,8,0v4A4,4,0,0,1,45,20Zm0-10a2,2,0,0,0-2,2v4a2,2,0,0,0,4,0V12a2,2,0,0,0-2-2Z"/><path d="M19,20a4,4,0,0,1-4-4V12a4,4,0,1,1,8,0v4A4,4,0,0,1,19,20Zm0-10a2,2,0,0,0-2,2v4a2,2,0,0,0,4,0V12a2,2,0,0,0-2-2Z"/></svg>
                                    {{formateDate($blog->created_date)}}
                                </time>
                                @if(!empty($blog->hour) || !empty($blog->minute) || !empty($blog->second))
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
                                        <span>
                                        @if($blog->hour)
                                                {{$blog->hour}} hr
                                            @elseif($blog->minute)
                                                {{$blog->minute}} min
                                            @elseif($blog->second)
                                                {{$blog->second}} sec
                                            @endif
                                        read
                                    </span>
                                    </div>
                                @endif
                            </div>
                        </div>
                    </article>
                @endforeach
            </div>
            <div class="lg:col-span-1">
                <div class="w-full mb-8 bg-white shadow-[1px_1px_10px_2px_rgba(0,0,0,0.1)] rounded-2xl p-6 lg:sticky top-20">
                    <h1 class="text-xl font-semibold tracking-wide">FEATURED POSTS</h1>
                    @foreach($featuredBlogs as $fBlogKey => $fBlog)
                        <article class="flex gap-x-1 mb-6 mt-2">
                            <img class="w-20 h-20 object-cover rounded-md" src="{{url($fBlog->small_img)}}">
                            <h3 class="ml-2">
                                {{--title--}}
                                <a href="{{route('blog', ['id' => Crypt::encryptString($fBlog->id), 'content_type' => $fBlog->content_type])}}" class="decoration-pink-500 hover:underline underline-offset-4 decoration-2 overflow-ellipsis line-clamp-2">
                                    {{$fBlog->title}}
                                </a>
                                {{--read time--}}
                                @if(!empty($fBlog->hour) || !empty($fBlog->minute) || !empty($fBlog->second))
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
                                    <span class="opacity-50">
                                        @if($fBlog->hour)
                                            {{$fBlog->hour}} hr
                                        @elseif($fBlog->minute)
                                            {{$fBlog->minute}} min
                                        @elseif($fBlog->second)
                                            {{$fBlog->second}} sec
                                        @endif
                                        read
                                    </span>
                                    </div>
                                @endif
                            </h3>
                        </article>
                    @endforeach
                </div>
            </div>
        </div>
    </div>

    <div class="mt-10" x-data="{
        blogs: (async function() {return (await axios.get('/api/getBlogs')).data.blogs.data;})(),
        tags: (async function() {return (await axios.get('/api/getTags')).data.tags;})(),
        blogsCurrentPage: 1,
        blogsData: undefined,
        sigleTag: undefined,
        loading: false,
    }">
        <h1 class="text-xl font-semibold tracking-wide">PREVIOUS POSTS</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-2">
            <template x-for="(blog, i) in blogs" :key="i">
                @includeIf('subviews.component.alpinejs.cardV2')
            </template>
        </div>
        <div class="flex justify-center my-8">
            <button class="rounded-3xl bg-yellow-400 py-3 px-5 hover:px-7 font-bold text-lg transition-all duration-200 flex justify-center items-center gap-x-2" @click="
                blogsCurrentPage += 1;
                const blogsArray = (await blogs);
                loading = true;
                blogs = (async function() {
                    const data = (await axios.get(`/api/getBlogs?page=${blogsCurrentPage}`)).data.blogs.data;
                    loading = false;
                    return blogsArray.concat(data);
                })();
            ">
                LOAD MORE
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" x-show="loading" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </button>
        </div>
    </div>
@endsection
