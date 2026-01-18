import {configureStore} from "@reduxjs/toolkit"
import RegistrationSlicer from "./LoginSlicer.js"
import CrmSlicer from "./CrmSlicer.js"
import productSlicer from "./productSlicer.js"
import CartSlicer from "./CartSlicer.js"
import FavoriteSlicer from "./FavoriteSlicer.js"
export const store = configureStore({
   reducer: {
      login: RegistrationSlicer,
      crm : CrmSlicer,
      products: productSlicer,
      cart : CartSlicer,
      favorite: FavoriteSlicer ,
   } 
})