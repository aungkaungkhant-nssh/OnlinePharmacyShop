import { jsPDF } from "jspdf";
import { renderToString } from "react-dom/server";

export const downloadBouncherPDF = (data)=>{
    // console.log(data)
	// let pdf = new jsPDF();
    // pdf.text("Thank you very much for the encouragement",17,10);
    
    // pdf.text("Invoice",23,20);

    // data.orderItems.forEach(order => {
    //    pdf.text(`${order.product.name} - ${order.qty}*${order.product.price}`,30,30)
    // });
    // pdf.text("---------------------------------------",30,35);
    // pdf.text("Total Amount - " + data.totalAmount + " (MMK)",30,40);
    // pdf.save();
}