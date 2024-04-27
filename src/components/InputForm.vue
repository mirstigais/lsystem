<template>
  <el-form
    ref="inputFormRef"
    :model="form"
    label-width="auto" 
    label-position="top"
    :rules="formRules"
    status-icon
  >
    <el-form-item>
        <el-checkbox v-model="form.drawWithAI" label="Draw with AI" size="large" />
    </el-form-item>
    <el-form-item v-if="form.drawWithAI" label="OpenAI API key" required>
        <el-input v-model="form.apiKey" id="apiKey" type="password" />
    </el-form-item>
    <el-form-item v-if="form.drawWithAI" label="Prompt" required>
        <el-input v-model="form.prompt" id="prompt" type="textarea" />
    </el-form-item>
    <el-form-item v-if="!form.drawWithAI" label="Iterations" required>
        <el-input-number v-model="form.iterations" id="iternationsInput" :min="1" controls-position="right" @change="handleChange" />
    </el-form-item>
    <el-form-item v-if="!form.drawWithAI" label="Angle" required>
        <el-input-number v-model="form.angle" id="angleInput" :min="0" controls-position="right" @change="handleChange" />
    </el-form-item>
    <el-form-item v-if="!form.drawWithAI" label="Line length" required>
        <el-input-number v-model="form.length" id="lengthInput" :min="1" controls-position="right" @change="handleChange" />
    </el-form-item>
    <el-form-item v-if="!form.drawWithAI" label="Start" required>
        <el-input v-model="form.start" id="startInput" placeholder="Start" />
    </el-form-item>
    <el-form-item v-if="!form.drawWithAI" label="Rules" required>
        <el-input v-model="form.drawRules" id="rulesInput" placeholder="Rules" type="textarea" />
    </el-form-item>
    <el-form-item label="Line color">
        <el-color-picker v-model="form.drawColor" @change="handleDrawColorChange" />
    </el-form-item>
    <el-form-item label="Background color">
        <el-color-picker v-model="form.backgroundColor" @change="handleBackgroundColorChange" />
    </el-form-item>
    <el-form-item class="button-wrapper">
        <el-form-item>
          <el-button type="primary" @click="submitForm(inputFormRef)">Draw</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm(inputFormRef)">Reset</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="canvasStore.saveImage">Save Image</el-button>
        </el-form-item>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
    import { defineComponent, ref, reactive, onMounted } from 'vue';
    import { useCanvasStore } from '@stores/canvas';
    import { DrawInput } from '@services/DrawingService';
    import DrawingServiceUtils from '@utils/DrawingServiceUtils';
    import { FormInstance, FormRules } from 'element-plus';
    import { Prompter } from '@models/Prompter';

    interface InputForm {
        iterations: number
        angle: number
        start: string
        length: number
        drawRules: string
        drawColor: string
        backgroundColor: string
        drawWithAI: boolean,
        apiKey: string,
        prompt: string,
    }

    const inputFormRef = ref<FormInstance>();

    const form = reactive<InputForm>({
        iterations: 1,
        angle: 1,
        start: '',
        length: 1,
        drawRules: '',
        drawColor: '',
        backgroundColor: '',
        drawWithAI: false,
        apiKey: '',
        prompt: '',
    });

    const formRules = reactive<FormRules<InputForm>>({
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
        start: [
            { 
                required: true,
                message: 'Please enter start (axiom)', 
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

    onMounted(() => {
        form.iterations = 4;
        form.angle = 30;
        form.start = 'X';
        form.length = 36;
        form.drawRules = 'X=F[-X][+X]';
        form.drawColor = '#000000';
        form.backgroundColor = '#FFFFFF';
    });

    const canvasStore = useCanvasStore();
 
    const handleChange = (value: number) => {
        console.log(value)
    };

    const handleBackgroundColorChange = (value: string) => {
        canvasStore.setBackgroundColor(value);
    };

    const handleDrawColorChange = (value: string) => {
        canvasStore.setDrawColor(value);
    };

    const submitForm = async (formEl: FormInstance | undefined) => {
        if (!formEl) return
        await formEl.validate((valid, fields) => {
            if (valid) {
                handleSubmit();
            } else {
            console.log('error submit!', fields)
            }
        })
    };

    const resetForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return
        console.log('here');
        formEl.resetFields()
    }

    const handleSubmit = () => {
        if(!form.drawWithAI) {
            let rulesObj = DrawingServiceUtils.convertRulesToAssociativeArr(form.drawRules);
            const submitData = new DrawInput(
                form.iterations,
                form.angle,
                form.start,
                rulesObj,
                form.length,
                form.drawColor,
                form.backgroundColor,
            )
        
            canvasStore.setInputData(submitData);
        } else {
            let prompter = new Prompter(form.apiKey, form.prompt);
            prompter.askAI();
        }
    };

    // watch(form, (newValue) => {
    //     console.log(newValue);
    //     canvasStore.setDrawColor(newValue.toString());
    // });

    // const formErrors = {
    //     iterationsError: '',
    //     angleError: '',
    //     constantsError: ''
    // };

    // const isDisabled = computed(() => {
    //     return formErrors.iterationsError !== "" || formErrors.constantsError !== "";
    // });

    // const validateConstants = () => {
    //     formErrors.constantsError = FormValidationService.validateConstants(formData.constants);
    // };

    // const validateIterations = () => {
    //     formErrors.iterationsError = FormValidationService.validateIterations(formData.iterations);
    // };

    // const validateAngle = () => {
    //     formErrors.angleError = FormValidationService.validateAngle(formData.angle);
    // };

    defineComponent({
        // formData,
        // formErrors,
        // isDisabled,
        // validateConstants,
        // validateIterations,
        // validateAngle,
        // handleSubmit
    });

    // export default defineComponent ({
    //     data() {
    //         return {
    //             formData: {
    //                 iterations: '',
    //                 angle: '',
    //                 constants: '',
    //                 axiom: '',
    //                 length: ''
    //             },
    //             formErrors: {
    //                 iterationsError: '',
    //                 angleError: '',
    //                 constantsError: ''
    //             }
    //         };
    //     },
    //     computed: {
    //         isDisabled (this: { formData: { iterationsError: string | null; constantsError: string | null } }): boolean {
    //             return (this.formData.iterationsError !== null || this.formData.constantsError !== null);
    //         }
    //     },
    //     methods: {
    //         validateConstants(this: { formData: { constants: string }, formErrors: { constantsError: string | null } }) {
    //             this.formErrors.constantsError = FormValidationService.validateConstants(this.formData.constants);
    //         },
    //         validateIterations(this: { formData: { iterations: number}, formErrors: {iterationsError: string | null } }) {
    //             this.formErrors.iterationsError = FormValidationService.validateIterations(this.formData.iterations);
    //         },
    //         validateAngle(this: { formData: { angle: number}, formErrors: {angleError: string | null } }) {
    //             this.formErrors.angleError = FormValidationService.validateAngle(this.formData.angle);
    //         },
    //         handleSubmit() {
    //             console.log('submit')
    //             this.$emit('form-submitted', this.formData);
    //         }
    //     },
    //     emits: ['form-submitted']
    // });
</script>

<style scoped>
    #inputForm {
        float:left;
        padding-right: 20%;
        /* width: 40%;
        height: 40%; */
    }
</style>