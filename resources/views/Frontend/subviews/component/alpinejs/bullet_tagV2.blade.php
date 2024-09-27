<div x-data="{sigleTag: (async function(){return (await tags).find(item=> item.id == tag);})()}" class="flex items-center bg-slate-200 py-1 px-3.5 rounded-[20px]">
    <div class="w-2 h-2 rounded-full mr-2" :style="`background-color: ${(await sigleTag).bullet_color}`"></div>
    <p class="text-sm font-thin" x-text="(await sigleTag).name"></p>
</div>
