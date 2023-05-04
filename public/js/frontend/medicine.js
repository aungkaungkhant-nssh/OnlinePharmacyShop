// async function searchMedicine(e){
//     e.preventDefault();
//     let page = $(this).next().val() || '';
//     let medicine = $(".smedicine").val() || '';
//     let category = $(this).next().val() || '';
//     $(".loading-container").show();
//     $(".product-container .product-lists").hide();
//     let res =  await fetch(`?page=${page}&medicine=${medicine}`);
//     let data = await res.json();
//     $(".loading-container").hide();
//     $(".product-container .product-lists").show();
//     renderToHTMLTemplate(data);
    
// }
// async function searchCategory(e){
//     e.preventDefault();
//     $(".search-category").attr('style','color: rgba(0, 0, 0, 0.5) !important;cursor: pointer;');
//     $(this).attr('style','color:#4E97FD !important;cursor: pointer;');
//     let medicine = $('.smedicine').val()|| '';
//     let page = $('.nextPage').next().val() || '';
//     let category = $(this).next().val() || '';
//     $(".loading-container").show();
//     $(".product-container .product-lists").hide();
//     let res = await fetch(`?category=${category}&medicine=${medicine}`);
//     let data = await res.json();
//     $(".loading-container").hide();
//     $(".product-container .product-lists").show();
//     renderToHTMLTemplate(data);
// }
// async function nextPage(e){
//     let page = $(this).next().val();
//     let medicine = $(".smedicine").val() || '';
//     let category = $("#categoryId").val() || '';
//     $(".loading-container").show();
//     $(".product-container .product-lists").hide();
//     let res =  await fetch(`?page=${page}&medicine=${medicine}&category=${category}`);
//     let data = await res.json();
//     $(".loading-container").hide();
//     $(".product-container .product-lists").show();
//     renderToHTMLTemplate(data);
// }
// function renderToHTMLTemplate(data){
//     $(".product-container .product-lists").html(`
//         <input type="hidden" value="${data.data.categoryId}" id="categoryId">
//         <div class="col-12 col-md-8">
//         </div>
//         <div class="col-12 col-md-4 text-center search-bar">
//             <form method="post">
//             <div class="form-row ">
//                 <div class="form-inline">
//                 <div class="my-1">
//                     <label class="sr-only" for="inlineFormInputGroupUsername">Username</label>
//                     <div class="input-group">
//                     <input type="text" class="form-control smedicine" id="inlineFormInputGroupUsername " placeholder= "Search Medicine" value=${data.data.searchedMedicine}>
                    
//                     <div class="input-group-prepend">
//                         <button type="submit" class="btn btn-primary search-medicine"><i class="fa-solid fa-magnifying-glass"></i></button>
//                     </div>
//                     </div>
//                 </div>
//                 </div>
//             </div>
//             </form>
//         </div>
//         ${data.data.products.length>0 ? 
//             `${data.data.products.map((p)=>(
//               `
//                 <div class="col-12 col-md-6 col-xl-4 col-lg-4  mt-4">
//                     <a href="/shop/${p._id}">
//                         <div class="card shadow" style="border-radius: 25px !important;">
//                             <div class="card-body">
//                                 <div class="text-center">
//                                 <img src="${p.image}" alt="" style="height: 150px;border-radius: 50%;">
//                                 </div>
                                
//                                 <div class="ratings">
//                                     <i class="fa-solid fa-star text-warning"></i>
//                                     <i class="fa-solid fa-star text-warning"></i>
//                                     <i class="fa-solid fa-star text-warning"></i>
//                                     <i class="fa-solid fa-star text-warning"></i>
//                                     <i class="fa-solid fa-star text-warning"></i>
//                                 </div>
//                                 <h5 class="card-title">${p.name}</h5>
//                                 <p>${p.price}(MMK) </p>
//                             </div>
//                         </div>
//                     </a>
//                  </div>
//                 `
//             )).join("")}` : 
//             `<div class="col-12">
//                 <h3 class="text-center mt-4 text-black-50">Products Not Found</h3>
//              </div>`}
//              <div class="col-12 mt-5 text-center">
//             <div class="d-flex justify-content-center">
//                 <nav aria-label="Page navigation example">
//                     <ul class="pagination">
//                         ${data.data.hasPreviousPage ? `<li class="page-item"><a class="page-link" href="${data.data.currentPage-1}"><i class="fa-solid fa-chevron-left"></i></a></li>`:''}
//                         ${data.data.paginators.map((p)=>(
//                             `<li class="page-item">
//                                 <span class="page-link nextPage ${p+1 == data.data.currentPage && 'bg-primary text-white'}">
//                                     ${p+1}
//                                 </span>
//                                 <input type="hidden" value="${p+1}">
//                             </li>`
//                         )).join("")}
//                         ${data.data.hasNextPage ? `<li class="page-item"><a class="page-link" href="${data.data.currentPage+1}"><i class="fa-solid fa-chevron-right"></i></a></li>` : ''}
//                     </ul>
//                 </nav>
//             </div>
//             </div>
//     `)
//     $(".nextPage").click(nextPage);
//     $(".search-medicine").click(searchMedicine);
//     $(".search-category").click(searchCategory)
// }
// $(".search-medicine").click(searchMedicine);
// $(".nextPage").click(nextPage);
// $(".search-category").click(searchCategory)
