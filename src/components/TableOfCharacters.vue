<template>
    <div id="content">
        <el-button type="info" @click='isHidden = !isHidden'>Show table of allowed characters</el-button>
        <div v-show='isHidden'>
            <p>The following characters have a geometric interpretation.</p>
            <a href="https://paulbourke.net/fractals/lsys/">Information Source</a>
            <el-table
                :data="tableData"
                style="width: 100%"
            >
            <el-table-column prop="character" label="Character" width="180" />
            <el-table-column prop="meaning" label="Meaning" width="180" />
                <!-- <tr>
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
                </tr> -->
            </el-table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isHidden = ref(0)

interface Record {
  character: string
  description: string
}

const tableData: Record[] = [
  {
    character: 'F',
    description: 'Move forward by line length drawing a line',
  },
  {
    character: '+',
    description: 'Turn left by turning angle',
  },
  {
    character: '-',
    description: 'Turn right by turning angle',
  },
  {
    character: '|',
    description: 'Reverse direction (ie: turn by 180 degrees)',
  },
  {
    character: '[',
    description: 'Push current drawing state onto stack',
  },
  {
    character: ']',
    description: 'Pop current drawing state from the stack',
  },
]
</script>