<template>
        <!-- <form id="inputForm" @submit.prevent="handleSubmit"> -->
    <el-form :model="form" label-width="auto" style="max-width: 600px">
        <el-form-item label="Iterations">
            <el-input-number v-model="iternations" id="iternationsInput" :min="1" :max="10" controls-position="right" @change="handleChange" />
        </el-form-item>
        <!-- <input type="number" id="iternationsInput" name="iternationsInput" v-model="formData.iterations" @input="validateIterations"><br> -->
        <span v-if="formErrors.iterationsError" class="error">{{ formErrors.iterationsError }}</span><br>
        <el-form-item label="Angle">
            <el-input-number v-model="angle" id="angleInput" :min="1" :max="10" controls-position="right" @change="handleChange" />
        </el-form-item>
        
        <!-- <input type="number" id="angleInput" name="angleInput" v-model="formData.angle" @input="validateAngle"><br> -->
        <span v-if="formErrors.angleError" class="error">{{ formErrors.angleError }}</span><br>
        <label for="constantsInput">Constants:</label><br>
        <el-input v-model="constants" id="constantsInput" style="width: 240px" placeholder="Constants" @input="validateConstants" />
        <!-- <input type="text" id="constantsInput" name="constantsInput" v-model="formData.constants" @input="validateConstants"><br> -->
        <span v-if="formErrors.constantsError" class="error">{{ formErrors.constantsError }}</span><br>
        <label for="lengthInput">Line length:</label><br>
        <el-input-number v-model="length" id="lengthInput" :min="1" :max="10" controls-position="right" @change="handleChange" />
        <!-- <input type="number" id="lengthInput" name="lengthInput" v-model="formData.length"><br> -->
        <label for="rulesInput">Rules:</label><br>
        <el-input v-model="rules" id="rulesInput" style="width: 240px" placeholder="Constants" @input="validateConstants" />
        <!-- <input type="text" id="rulesInput" name="rulesInput" v-model="formData.rules"><br> -->
        <button type="submit" :disabled="isDisabled">Submit</button> 
        <!-- </form> -->
    </el-form>
</template>

<script setup lang="ts">
    import { computed, defineComponent, ref, reactive } from 'vue';
    import FormValidationService from '@services/FormValidationService';
    import { useCanvasStore } from '@stores/canvas';
    import { DrawInput } from '@services/DrawingService';
    import DrawingServiceUtils from '@utils/DrawingServiceUtils';

    const form = reactive({
        iterations: 4,
        angle: 30,
        constants: 'X',
        length: 36,
        rules: 'X=F[-X][+X]'
    });

    const canvasStore = useCanvasStore();
    const iternations = ref(1);
    const angle = ref(1);
    const constants = ref();
    const length = ref(1);
    const rules = ref();

    const formData = {
        iterations: 4,
        angle: 30,
        constants: 'X',
        length: 36,
        rules: 'X=F[-X][+X]'
    };
 
    const handleChange = (value: number) => {
        console.log(value)
    }

    const formErrors = {
        iterationsError: '',
        angleError: '',
        constantsError: ''
    };

    const isDisabled = computed(() => {
        return formErrors.iterationsError !== "" || formErrors.constantsError !== "";
    });

    const validateConstants = () => {
        formErrors.constantsError = FormValidationService.validateConstants(formData.constants);
    };

    const validateIterations = () => {
        formErrors.iterationsError = FormValidationService.validateIterations(formData.iterations);
    };

    const validateAngle = () => {
        formErrors.angleError = FormValidationService.validateAngle(formData.angle);
    };

    const handleSubmit = () => {
        //this should be elsewhere
        let constants = formData.constants.split(',');
        let rulesObj = DrawingServiceUtils.convertRulesToAssociativeArr(formData.rules);

        const submitData = new DrawInput(
            formData.iterations,
            formData.angle,
            constants,
            rulesObj,
            formData.length
        )
        
        canvasStore.setInputData(submitData);
    };

    defineComponent({
        formData,
        formErrors,
        isDisabled,
        validateConstants,
        validateIterations,
        validateAngle,
        handleSubmit
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