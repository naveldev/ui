/*
 *
 * Navel UI
 * Created by Navi Ismail
 *
 * Copyrights (c) navel.dev 2020
 */

import * as Components from "./components";

export class Class
{
	static install(Vue, options = {})
	{
		this.registerComponents(Vue);
	}

	static registerComponents(Vue)
	{
		Object.values(Components).forEach(c => Vue.component(c.name, c));
	}
}

export default Class;
