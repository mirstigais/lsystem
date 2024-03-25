<template>
        <form id="inputForm" @submit.prevent="handleSubmit">
            <label for="iternationsInput">Iterations:</label><br>
            <input type="number" id="iternationsInput" name="iternationsInput" v-model="formData.iterations" @input="validateIterations"><br>
            <span v-if="formErrors.iterationsError" class="error">{{ formErrors.iterationsError }}</span><br>
            <label for="angleInput">Angle:</label><br>
            <input type="number" id="angleInput" name="angleInput" v-model="formData.angle" @input="validateAngle"><br>
            <span v-if="formErrors.angleError" class="error">{{ formErrors.angleError }}</span><br>
            <label for="constantsInput">Constants:</label><br>
            <input type="text" id="constantsInput" name="constantsInput" v-model="formData.constants" @input="validateConstants"><br>
            <span v-if="formErrors.constantsError" class="error">{{ formErrors.constantsError }}</span><br>
            <label for="lengthInput">Line length:</label><br>
            <input type="number" id="lengthInput" name="lengthInput" v-model="formData.length"><br>
            <label for="rulesInput">Rules:</label><br>
            <input type="text" id="rulesInput" name="rulesInput" v-model="formData.rules"><br>
            <button type="submit" :disabled="isDisabled">Submit</button> 
        </form>
</template>

<script setup lang="ts">
    import { computed, defineComponent } from 'vue';
    import FormValidationService from '@services/FormValidationService';
    import { useCanvasStore } from '@stores/canvas';
    import { DrawInput } from '@services/DrawingService';
    import DrawingServiceUtils from '@utils/DrawingServiceUtils';

    const canvasStore = useCanvasStore()

    const formData = {
        iterations: 4,
        angle: 30,
        constants: 'X',
        length: 36,
        rules: 'X=F[-X][+X]'
    };

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