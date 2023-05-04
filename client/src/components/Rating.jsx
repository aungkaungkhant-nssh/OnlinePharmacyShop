import React from 'react'

function Rating({rating,numReviews}) {
  return (
    <>
        <span className='text-warning mr-1'>
            {
                rating >=1 
                ?<i class="fa-solid fa-star"></i>
                : rating >=1.5
                ?<i class="fa-solid fa-star-half"></i>
                :<i class="fa-regular fa-star"></i>
            }
        </span>
        <span className='text-warning mr-1'>
            {
                rating >=2 
                ?<i class="fa-solid fa-star"></i>
                : rating >=2.5
                ?<i class="fa-solid fa-star-half"></i>
                :<i class="fa-regular fa-star"></i>
            }
        </span>
        <span className='text-warning mr-1'>
            {
                rating >=3 
                ?<i class="fa-solid fa-star"></i>
                : rating >=3.5
                ?<i class="fa-solid fa-star-half"></i>
                :<i class="fa-regular fa-star"></i>
            }
        </span>
        <span className='text-warning mr-1'>
            {
                rating >=4 
                ?<i class="fa-solid fa-star"></i>
                : rating >=4.5
                ?<i class="fa-solid fa-star-half"></i>
                :<i class="fa-regular fa-star"></i>
            }
        </span>
        <span className='text-warning mr-2'>
            {
                rating >=5 
                ?<i class="fa-solid fa-star"></i>
                : rating >=5.5
                ?<i class="fa-solid fa-star-half"></i>
                :<i class="fa-regular fa-star"></i>
            }
        </span>
        <span className='text-black-50'>

            {numReviews>0 &&  (`(${numReviews} reviews)`)}
        </span>
    </>
  )
}

export default Rating