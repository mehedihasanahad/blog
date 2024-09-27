<div class="grid grid-cols-1 lg:grid-cols-4 gap-8" x-data="{
    seriesContent: (async function(){
        return (await axios.get('/api/seriesContent/{{request()->segment(count(request()->segments()))}}')).data.seriesContent;
    })(),
    contentHtml: '<p>Content coming soon...</p>',
    clickItem(elem) {
        setTimeout(function(){
            elem.click();
        }, 0);
    },
    selectSidebarMenuBG(elem) {
        const liItems = Array.from(document.getElementById('listBlogSidebar').children);
        liItems.shift();
        liItems.forEach((item) => {
            if (item.id == elem.id) item.style.background = '#82EAFF';
            else item.style.background = '#E2E8F0';
        });
        document.documentElement.scrollTop = 0;
    }
}">
    <div class="lg:col-span-1">
        <div class="w-full mb-8 bg-white shadow-[1px_1px_10px_2px_rgba(0,0,0,0.1)] rounded-2xl p-6 lg:sticky top-20">
            <h1 class="text-xl font-semibold tracking-wide">Menu bar</h1>
            <div class="max-h-[25rem] overflow-y-auto">
                <ul class="mt-2 [&_li]:p-1 [&_li]:bg-slate-200 [&_li]:mb-2 [&_li]:rounded [&_li]:cursor-pointer" id="listBlogSidebar">
                    <template x-for="content,i in seriesContent">
                        <li class="overflow-ellipsis line-clamp-1" x-text="content.title; i==0? clickItem($el) :''" :id="`list-${i}`" @click="contentHtml = content.content; selectSidebarMenuBG($el);"></li>
                    </template>
                </ul>
            </div>
        </div>
    </div>
    <div class="lg:col-span-3">
        <div class="w-full mb-8 bg-white shadow-[1px_1px_10px_2px_rgba(0,0,0,0.1)] rounded-2xl p-6" x-html="contentHtml"></div>
    </div>
</div>

