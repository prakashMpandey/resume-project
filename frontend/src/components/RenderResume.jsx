import React,{forwardRef} from 'react'
import Template1 from './templates/Template1'
import Template2 from './templates/Template2'

const RenderResume=({resumeData,templateComp,ref,isPrint}) =>{

    console.log(templateComp)
    switch(templateComp){

        case "Template1":
            return (
                <Template1 resume={resumeData} ref={ref} isPrint={isPrint}/>
            )
        case "Template2":
            return (
                <Template2 resumeData={resumeData}/>
            )
    }
}

export default RenderResume
