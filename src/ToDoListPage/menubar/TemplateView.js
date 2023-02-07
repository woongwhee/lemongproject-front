import React from 'react'
import {TemplateProvider} from "../../template/TemplateContext";
import TemplateSwitcher from "../../template/TemplateSwitcher";

function TemplateView() {
  return (
      <TemplateProvider>
          <TemplateSwitcher/>
      </TemplateProvider>
  )
}

export default TemplateView