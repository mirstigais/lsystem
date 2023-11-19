<script setup>
    import { ref } from 'vue'
    
    const errors = [];
    const iterations = ref(1);
    const constants = ref('');
    const axiom = ref('');
    const angle = ref(1);
    const length = ref(1);

    const formInputs = {
        iterations,
        constants,
        axiom,
        angle,
        length
    };

    function checkForm(e) {
        errors = [];
        formInputs.array.forEach(element => {
            if (element == null || element < 0) {
                errors.push("Wrong input");
            }

            if (errors.length != 0) {
                return;
            }
        });
    }
</script>
<template>
        <form id="inputForm">
            <label for="iternationsInput">Iterations:</label><br>
            <input type="number" id="iternationsInput" name="iternationsInput" v-model="iterations"><br>
            <label for="angleInput">Angle:</label><br>
            <input type="number" id="angleInput" name="angleInput" v-model="angle"><br>
            <label for="constantsInput">Constants:</label><br>
            <input type="number" id="constantsInput" name="constantsInput" v-model="constants"><br>
            <label for="axoimInput">Axoim:</label><br>
            <input type="number" id="axoimInput" name="axoimInput" v-model="axiom"><br>
            <label for="lengthInput">Line length:</label><br>
            <input type="number" id="lengthInput" name="lengthInput" v-model="length"><br>
            <button type="button" @click="checkForm">Submit</button> 
        </form>
</template>

<style scoped>
    #inputForm {
        float:left;
        padding-right: 20%;
        /* width: 40%;
        height: 40%; */
    }
</style>