<template>
<div id="base-search">
  <el-input style="width: 730px;" 
    v-model="searchString" 
    placeholder="请输入视频名" 
    clearable
    @keyup.enter.native="searchData"></el-input>
  <el-button style="margin: 10px"
    icon="el-icon-search"
    plain                   
    @click="searchData"></el-button>
  <el-form class="choose-condition">            
    <el-form-item>
      <el-row :gutter="10">
        <el-col :span="6">
          <el-select 
            v-model="college" 
            placeholder="请选择学院"
            clearable
            @change="selectCollege">
            <el-option 
              v-for="item in collegeOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-select 
            v-model="classroom" 
            placeholder="教室"
            clearable
            @change="selectClassroom">
            <el-option 
              v-for="item in classroomOptions"
              :key="item.id"
              :label="item.roomCode"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-select 
            v-model="teacher" 
            placeholder="教师"
            clearable
            @change="selectTeacher">
            <el-option
              v-for="item in teacherOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-select 
            v-model="course" 
            placeholder="课程"
            clearable
            @change="selectCourse">
            <el-option
              v-for="item in courseOptions"
              :key="item.cid"
              :label="item.name"
              :value="item.cid"></el-option>
          </el-select>
        </el-col>
      </el-row>
    </el-form-item>
  </el-form> 
</div>
</template>

<script>
import { getAllColleges } from "@/api/college"
import { getAllTeachersByCollegeId } from "@/api/teacher"
import { getAllClassrooms } from "@/api/classroom"
import { getAllCoursesByTeacherId } from "@/api/course"
export default {
  data() {
    return {
      college: null,
      classroom: '',
      teacher: '',
      course: '',
      searchString: '',
      collegeOptions: [],
      classroomOptions: [],
      teacherOptions: [],
      courseOptions: [],
    }
  },
  methods: {
    searchData() {
      this.$emit('search-data')
    },
    selectCollege(val) {
      this.college = val === ''? null : val
      this.$store.commit('SET_COLLEGE', this.college)
      this.$emit('select-college')
    },
    selectClassroom(val) {
      this.classroom = val
      this.$store.commit('SET_CLASSROOM', this.classroom)
      this.$emit('select-classroom')
    },
    selectTeacher(val) {
      this.teacher = val
      this.$store.commit('SET_TEACHER', this.teacher)
      this.$emit('select-teacher')
    },
    selectCourse(val) {
      this.course = val
      this.$store.commit('SET_COURSE', val)
      this.$emit('select-course')
    }
  },
  watch: {
    college: function(val, oldVal) {
      getAllTeachersByCollegeId(val).then(res => {
        this.teacherOptions = res.data.result
      })
    },
    teacher: function(val, oldVal) {
      getAllCoursesByTeacherId(val).then(res => {
        this.courseOptions = res.data.result
      })
    } 
  },
  mounted() { 
    getAllColleges().then(res => {
      this.collegeOptions = res.data.result
    })
    getAllClassrooms().then(res => {
      this.classroomOptions = res.data.result
    })
  }    
}
</script>

<style lang="less" scoped>
.choose-condition {
  border-top: 1px solid #ddd;
  padding: 10px;
  background: #f7f7f7;
}
</style>
