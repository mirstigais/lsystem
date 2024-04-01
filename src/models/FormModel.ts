import type { FormInstance, FormRules } from 'element-plus';
import { reactive } from 'vue';

interface InputForm {
  iterations: number
  angle: number
  constants: string
  length: number
  drawRules: string
}

const inputFormRef = ref<FormInstance>()

const form = reactive<InputForm>({
  iterations: 1,
  angle: 1,
  constants: '',
  length: 1,
  drawRules: '',
});

export const formRules = reactive<FormRules<InputForm>>({
  iterations: [
      {
      required: true,
      message: 'Please enter iteration count',
      trigger: 'change',
      },
  ],
  angle: [
      {
          required: true,
          message: 'Please enter angle',
          trigger: 'change'
      },
      { 
          min: 0, 
          message: 'Angle cannot be less than 0', 
          trigger: 'blur' 
      },
  ],
  constants: [
      { 
          required: true,
          message: 'Please enter constants', 
          trigger: 'blur' 
      },
  ],
  length: [
      {
          required: true,
          message: 'Please enter length',
          trigger: 'change'
      },
      { 
          min: 0, 
          message: 'Length cannot be less than 0', 
          trigger: 'blur' 
      },
  ],
  drawRules: [
      { 
          required: true, 
          message: 'Please enter rules', 
          trigger: 'blur' 
      },
  ],
});