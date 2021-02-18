export default function generateClassNames (componentCss, {...cssProps}) {
	return Object.keys(cssProps)
		.filter( item => cssProps[item] && typeof cssProps[item] !== 'undefined' && item )
		.map( item => componentCss[item] || componentCss[cssProps[item]] || item)
		.join(' ');
}
