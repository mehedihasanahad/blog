import {Link} from "react-router-dom";
import { useImmer } from "use-immer";
import { useFormData } from "@/helper/index.js";

export default function Blog() {
    const [categoryFormData, setCategoryFormData] = useImmer({
        name: '',
        slug: '',
        descriptions: '',
        status: 0
    });

    function updateFormData(property, value) {
        setCategoryFormData((draft) => {
            draft[property] = value;
        });
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        $axios.post('categories', useFormData(categoryFormData))
            .then(res => {
                console.log(res, 'res');
            })
            .catch(e => {
                console.log(e.response);
            })
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                Name
                            </label>
                            <div className="mt-2">
                                <input type="text"
                                       value={categoryFormData.name}
                                       onInput={(e) => updateFormData('name', e.target.value)}
                                       name="name"
                                       id="name"
                                       autoComplete="given-name"
                                       className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="Slug" className="block text-sm font-medium leading-6 text-gray-900">
                                Slug
                            </label>
                            <div className="mt-2">
                                <input type="text"
                                       name="Slug"
                                       value={categoryFormData.slug}
                                       onInput={(e) => updateFormData('slug', e.target.value)}
                                       id="Slug"
                                       autoComplete="family-name"
                                       className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="descriptions"
                                   className="block text-sm font-medium leading-6 text-gray-900">Descriptions</label>
                            <div className="mt-2">
                                <textarea id="descriptions"
                                          name="descriptions"
                                          value={categoryFormData.descriptions}
                                          onInput={(e) => updateFormData('descriptions', e.target.value)}
                                          rows="3"
                                          className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="status" className="block text-sm font-medium leading-6 text-gray-900">
                                Status
                            </label>
                            <div className="mt-2">
                                <select name="Status"
                                        id="status"
                                        value={categoryFormData.status}
                                        onChange={(e) => updateFormData('status', e.target.value)}
                                        autoComplete="family-name"
                                       className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                    <option value="1">Active</option>
                                    <option value="0">Inactive</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <Link to="/admin/categories" type="button" className="custom-btn-border-gray-300">Back</Link>
                <button className="custom-btn-primary">Save</button>
            </div>
        </form>
    )
}
