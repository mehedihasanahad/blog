@inject('crypt', 'Illuminate\Support\Facades\Crypt')
<div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
    <div class="lg:col-span-1">
        <div class="w-full mb-8 bg-white shadow-[1px_1px_10px_2px_rgba(0,0,0,0.1)] rounded-2xl p-6 lg:sticky top-20">
            <h1 class="text-xl font-semibold tracking-wide">Menu bar</h1>
            <div class="max-h-[25rem] overflow-y-auto">
                <ul class="mt-2 [&_li]:p-1 [&_li]:bg-slate-200 [&_li]:mb-2 [&_li]:rounded [&_li]:cursor-pointer" id="listBlogSidebar">
                    @foreach($series_content_list as $listKey => $list)
                        <li class="overflow-ellipsis line-clamp-1" style="{{($crypt::decryptString(request()->segment(count(request()->segments()))) == $listKey) ? 'background: rgb(141, 157, 178); color: white;' : ''}}">
                            <a href="{{route('seriesContent', ['blog_id' => $crypt::encryptString($blog->id), 'id' => $crypt::encryptString($listKey)])}}" class="block">
                                {{$list}}
                            </a>
                        </li>
                    @endforeach
                </ul>
            </div>
        </div>
    </div>
    <div class="lg:col-span-3">
        <div class="w-full mb-8 bg-white shadow-[1px_1px_10px_2px_rgba(0,0,0,0.1)] rounded-2xl p-6">
            @if(empty($content->content))
                <h4>No content found</h4>
            @else
                {!! $content->content !!}
            @endif
        </div>
    </div>
</div>

<script>
    @if(count(request()->segments()) == 2)
        document.getElementById('listBlogSidebar').children[0].children[0].click()
    @endif
</script>
