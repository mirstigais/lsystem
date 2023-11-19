<script setup>
import { ref } from 'vue'

const isHidden = ref(0)
</script>

<template>
    <div id="content">
        <button @click='isHidden = !isHidden'>Show table of allowed characters</button>
        <div v-show='isHidden'>
            <p>The following characters have a geometric interpretation.</p>
            <a href="https://paulbourke.net/fractals/lsys/">Information Source</a>
            <table>
                <tr>
                    <th>Character</th>
                    <th>Meaning</th>
                </tr>
                <tr>
                    <td>F</td>
                    <td>Move forward by line length drawing a line</td>
                </tr>
                <tr>
                    <td>f</td>
                    <td>Move forward by line length drawing a line</td>
                </tr>
                <tr>
                    <td>+</td>
                    <td>Turn left by turning angle</td>
                </tr>
                <tr>
                    <td>-</td>
                    <td>Turn right by turning angle</td>
                </tr>
                <tr>
                    <td>|</td>
                    <td>Reverse direction (ie: turn by 180 degrees)</td>
                </tr>
                <tr>
                    <td>[</td>
                    <td>Push current drawing state onto stack</td>
                </tr>
                <tr>
                    <td>]</td>
                    <td> Pop current drawing state from the stack</td>
                </tr>
                <tr>
                    <td>#</td>
                    <td>Increment the line width by line width increment</td>
                </tr>
                <tr>
                    <td>!</td>
                    <td>Decrement the line width by line width increment</td>
                </tr>
                <tr>
                    <td>@</td>
                    <td>Draw a dot with line width radius</td>
                </tr>
                <tr>
                    <td>{</td>
                    <td>Open a polygon</td>
                </tr>
                <tr>
                    <td>}</td>
                    <td>Close a polygon and fill it with fill colour</td>
                </tr>
                <tr>
                    <td>></td>
                    <td>Multiply the line length by the line length scale factor</td>
                </tr>
                <tr>
                    <td>&lt</td>
                    <td>Divide the line length by the line length scale factor</td>
                </tr>
                <tr>
                    <td>&</td>
                    <td>Swap the meaning of + and -</td>
                </tr>
                <tr>
                    <td>(</td>
                    <td>Decrement turning angle by turning angle increment</td>
                </tr>
                <tr>
                    <td>)</td>
                    <td>Increment turning angle by turning angle increment</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<style scoped>
/* #content {
    float: left;
    background-color: red;
    display: block;
} */

</style>