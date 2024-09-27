<article class="w-full bg-white shadow-[1px_1px_10px_2px_rgba(0,0,0,0.1)] rounded-2xl p-6">
    {{--blog image--}}
    <div class="col-span-2 overflow-hidden rounded-2xl">
        <a :href="'/blog/'+ (await axios.get('/api/getEncryptedId/'+blog.id)).data.encryptedId+'?content_type='+blog.content_type">
            <img class="w-full h-60 object-cover hover:scale-105 transition duration-500" :src="'/'+blog.small_img">
        </a>
    </div>
    <div class="mt-5 col-span-3">
        {{--tag--}}
        <div class="flex gap-2">
            <template x-for="(tag,i) in blog.tag_ids">
                @includeIf('subviews.component.alpinejs.bullet_tagV2')
            </template>
        </div>
        {{--title--}}
        <h1 class="mt-2 text-xl font-bold">
            <a :href="'/blog/'+ (await axios.get('/api/getEncryptedId/'+blog.id)).data.encryptedId+'?content_type='+blog.content_type" x-text="blog.title" class="decoration-pink-500 hover:underline underline-offset-4 decoration-2 overflow-ellipsis line-clamp-2"></a>
        </h1>
        {{--sub title--}}
        <p class="mt-2 overflow-ellipsis line-clamp-3" x-text="blog.sub_title"></p>
        {{--read time--}}
        <div class="mt-2 text-slate-400 flex gap-x-4">
            <time datetime="2022-05-02">
                <svg class="h-4 w-4 inline-block opacity-50" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 64 64"><title>calender</title><path d="M35,36H29a1,1,0,0,1-1-1V29a1,1,0,0,1,1-1h6a1,1,0,0,1,1,1v6A1,1,0,0,1,35,36Zm-5-2h4V30H30Z"/><path d="M48,36H42a1,1,0,0,1-1-1V29a1,1,0,0,1,1-1h6a1,1,0,0,1,1,1v6A1,1,0,0,1,48,36Zm-5-2h4V30H43Z"/><path d="M48,46H42a1,1,0,0,1-1-1V39a1,1,0,0,1,1-1h6a1,1,0,0,1,1,1v6A1,1,0,0,1,48,46Zm-5-2h4V40H43Z"/><path d="M35,46H29a1,1,0,0,1-1-1V39a1,1,0,0,1,1-1h6a1,1,0,0,1,1,1v6A1,1,0,0,1,35,46Zm-5-2h4V40H30Z"/><path d="M22,36H16a1,1,0,0,1-1-1V29a1,1,0,0,1,1-1h6a1,1,0,0,1,1,1v6A1,1,0,0,1,22,36Zm-5-2h4V30H17Z"/><path d="M22,46H16a1,1,0,0,1-1-1V39a1,1,0,0,1,1-1h6a1,1,0,0,1,1,1v6A1,1,0,0,1,22,46Zm-5-2h4V40H17Z"/><path d="M52,51H12a5,5,0,0,1-5-5V18a5,5,0,0,1,5-5h4a1,1,0,0,1,1,1v2a2,2,0,0,0,4,0V14a1,1,0,0,1,1-1h7a1,1,0,0,1,1,1v2a2,2,0,0,0,4,0V14a1,1,0,0,1,1-1h7a1,1,0,0,1,1,1v2a2,2,0,0,0,4,0V14a1,1,0,0,1,1-1h4a5,5,0,0,1,5,5V46A5,5,0,0,1,52,51ZM12,15a3,3,0,0,0-3,3V46a3,3,0,0,0,3,3H52a3,3,0,0,0,3-3V18a3,3,0,0,0-3-3H49v1a4,4,0,0,1-8,0V15H36v1a4,4,0,0,1-8,0V15H23v1a4,4,0,0,1-8,0V15Z"/><path d="M56,25H8a1,1,0,0,1,0-2H56a1,1,0,0,1,0,2Z"/><path d="M32,20a4,4,0,0,1-4-4V12a4,4,0,1,1,8,0v4A4,4,0,0,1,32,20Zm0-10a2,2,0,0,0-2,2v4a2,2,0,0,0,4,0V12a2,2,0,0,0-2-2Z"/><path d="M45,20a4,4,0,0,1-4-4V12a4,4,0,1,1,8,0v4A4,4,0,0,1,45,20Zm0-10a2,2,0,0,0-2,2v4a2,2,0,0,0,4,0V12a2,2,0,0,0-2-2Z"/><path d="M19,20a4,4,0,0,1-4-4V12a4,4,0,1,1,8,0v4A4,4,0,0,1,19,20Zm0-10a2,2,0,0,0-2,2v4a2,2,0,0,0,4,0V12a2,2,0,0,0-2-2Z"/></svg>
                <span x-text="new Date(blog.created_date).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric' })"></span>
            </time>
            <div x-show="blog.hour || blog.minute || blog.second">
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
                    <span x-show="blog.hour" x-text="blog.hour + ' hr'"></span>
                    <span x-show="blog.minute" x-text="blog.minute + ' min'"></span>
                    <span x-show="blog.second" x-text="blog.second + ' sec'"></span>
                    read
                </span>
            </div>
        </div>
    </div>
</article>
