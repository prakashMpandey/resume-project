import html2canvas from "html2canvas";

export const fixTailwindColors = (element) => {
  const elements = element.querySelectorAll("*");

  elements.forEach((el) => {
    const style = window.getComputedStyle(el);

    // Fix colors
    ["color", "background-color", "border-color"].forEach((prop) => {
      const value = style.getPropertyValue(prop);
      if (value && (value.includes("oklch") || value.includes("oklab"))) {
        if (prop === "background-color") {
          el.style.setProperty(prop, "#fff"); // white bg
        } else {
          el.style.setProperty(prop, "#000"); // black text/border
        }
      }
    });

    // Fix shadows
    const shadow = style.getPropertyValue("box-shadow");
    if (shadow && (shadow.includes("oklch") || shadow.includes("oklab"))) {
      el.style.setProperty("box-shadow", "none");
    }

    // Fix background-image gradients if they contain oklab/oklch
    const bgImage = style.getPropertyValue("background-image");
    if (bgImage && (bgImage.includes("oklch") || bgImage.includes("oklab"))) {
      el.style.setProperty("background-image", "none");
    }
  });
};

export async function captureElementImage(element){

    if(!element) throw new Error("no element provided")

    const canvas=await html2canvas(element)

    return canvas.toDataURL("image/png")

}

export const dataUrlToFile=(dataUrl,fileName)=>{

    const arr=dataUrl.split(",")
    const mime=arr[0].match(/:(.*);/)[1];
    const bstr=atob(arr[1])

    let n=bstr.length;
    const u8arr=new Uint8Array(n);

    while(n--)
    {
        u8arr[n]=bstr.charCodeAt(n);
    }

    return new File([u8arr],fileName,{type:mime});
}
