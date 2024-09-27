@extends('layout.layout')
@section('title', $tagDetails->name)
@section('pages')

    <div>
        {{--tag background image--}}
        <div class="h-64 opacity-20 bg-no-repeat bg-cover bg-center absolute inset-0"
             style="background-image: linear-gradient(to bottom,transparent, rgb(255, 255, 255, 1)), url('{{url($tagDetails->image)}}');"
        ></div>

        {{--main content--}}
        <div class="mt-2">
            {{--header part--}}
            <div>
                <div class="h-40 w-40 rounded-full border-[0.875rem] border-amber-400 mx-auto overflow-hidden">
                    <img class="object-cover h-40 w-40" src="{{url($tagDetails->small_img)}}"/>
                </div>
                <h1 class=" text-center text-5xl font-bold mt-2">
                    {{$tagDetails->name}}
                </h1>
                <p class="mt-2 text-2xl w-[80%] text-center mx-auto font-thin">
                    {{$tagDetails->details}}
                </p>
            </div>
            {{--body part--}}
            <div class="mt-10" x-data="{
                blogs: (async function() {
                    return (await axios.get('/api/individualTagDataBlogs/{{request()->segment(count(request()->segments()))}}')).data.blogs.data;
                })(),
                tags: (async function() {return (await axios.get('/api/getTags')).data.tags;})(),
                blogsCurrentPage: 1,
                blogsData: undefined,
                sigleTag: undefined,
                loading: false,
            }">
                <p class="text-sm">{{$totalBlog}} POSTS</p>
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
                            const data = (await axios.get(`/api/individualTagDataBlogs/{{request()->segment(count(request()->segments()))}}?page=${blogsCurrentPage}`)).data.blogs.data;
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
        </div>
    </div>
@endsection
