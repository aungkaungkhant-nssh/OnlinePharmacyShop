

export const getBreadCrumb = (pathname)=>{
    let path = pathname.split("/")[2];
    let currentAccordion = path.split("-")[1];
    let plus="/add-";
    let all ="/lists-";
    let breadcrumbs = [];
    if(path.includes(currentAccordion)){
        plus+=currentAccordion;
        all+=currentAccordion;
        breadcrumbs.push(
            {
                bname:`${plus.split("-")[0].slice(1)} ${plus.split("-")[1]}`,
                bpath:plus
            },
            {
                bname:`${all.split("-")[0].slice(1)} ${all.split("-")[1]}`,
                bpath:all
            },
        )        
    }
   return breadcrumbs;
    
}