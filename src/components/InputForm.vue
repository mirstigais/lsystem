<template>
    <el-form
        ref="inputFormRef"
        :model="form"
        label-width="auto" 
        style="max-width: 600px"
        :rules="formRules"
        status-icon
    >
        <el-form-item label="Iterations" required>
            <el-input-number v-model="form.iterations" id="iternationsInput" :min="1" :max="10" controls-position="right" @change="handleChange" />
        </el-form-item>
        <el-form-item label="Angle" required>
            <el-input-number v-model="form.angle" id="angleInput" :min="0" controls-position="right" @change="handleChange" />
        </el-form-item>
        <el-form-item label="Line length" required>
            <el-input-number v-model="form.length" id="lengthInput" :min="1" controls-position="right" @change="handleChange" />
        </el-form-item>
        <el-form-item label="Constants" required>
            <el-input v-model="form.constants" id="constantsInput" style="width: 240px" placeholder="Constants" />
        </el-form-item>
        <el-form-item label="Rules" required>
            <el-input v-model="form.drawRules" id="rulesInput" style="width: 240px" placeholder="Rules" />
        </el-form-item>
        <el-form-item>
            <el-col :span="5">
                <el-form-item>
                    <el-button type="primary" @click="submitForm(inputFormRef)">Draw</el-button>
                </el-form-item>
            </el-col>
            <el-col :span="5">
                <el-form-item>
                    <el-button @click="resetForm(inputFormRef)">Reset</el-button>
                </el-form-item>
            </el-col>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
    import { defineComponent, ref, reactive, onMounted } from 'vue';
    // import FormValidationService from '@services/FormValidationService';
    import { useCanvasStore } from '@stores/canvas';
    import { DrawInput } from '@services/DrawingService';
    import DrawingServiceUtils from '@utils/DrawingServiceUtils';
    import type { FormInstance, FormRules } from 'element-plus'

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

    onMounted(() => {
        form.iterations = 4;
        form.angle = 30;
        form.constants = 'X';
        form.length = 36;
        form.drawRules = 'X=F[-X][+X]';
    });

    const canvasStore = useCanvasStore();
 
    const handleChange = (value: number) => {
        console.log(value)
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

    const handleSubmit = () => {
        //this should be elsewhere
        let constants = form.constants.split(',');
        let rulesObj = DrawingServiceUtils.convertRulesToAssociativeArr(form.drawRules);

        const submitData = new DrawInput(
            form.iterations,
            form.angle,
            constants,
            rulesObj,
            form.length
        )
        
        canvasStore.setInputData(submitData);
    };

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