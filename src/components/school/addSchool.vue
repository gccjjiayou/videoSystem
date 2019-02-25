<template>
<el-dialog
  title="添加学校"
  :visible.sync="centerDialogVisible"
  width="30%"
  center>
  <el-card>
    <fl-form ref="form" label-width="80px">
      <el-form-item label="区域">
        <el-select v-model="region">
          <el-option
            v-for="(item, index) in regionOptions"
            :key="index"
            :lable="item.value"
            :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学校">
        <el-select v-model="school">
          <el-option
            v-for="(item, index) in schoolOptions"
            :key="index"
            :label="item.value"
            :value="item.id"></el-option>
        </el-select>
      </el-form-item>
    </fl-form>
  </el-card>
</el-dialog>
</template>

<script>
export default {
  data() {
    return {
      form: {
        region: '',
        school: '',
      },
      regionOptions: [
        {
          label: '北京',
          value: 1,
        },
        {
          label: '上海',
          value: 2,
        },
        {
          label: '广州',
          value: 3
        },
        {
          label: '深圳',
          value: 4,
        }

      ],
      schoolOptions: [
        {
          label: '北京大学',
          value: 1,
        },
        {
          label: '清华大学',
          value: 2,
        },
        {
          label: '复旦大学',
          value: 3,
        }
      ]

    }
  }
  
}
</script>

<style>

</style>

