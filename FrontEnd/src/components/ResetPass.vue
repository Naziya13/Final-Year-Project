<template>
    <div class="vue-tempalte">
        <form>
            <h3>Reset Password</h3>

            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control form-control-lg" required>
            </div>
            <div class="form-group">
                <label>Confirm Password</label>
                <input type="password" class="form-control form-control-lg" required>
            </div>

            <button type="submit" class="btn btn-dark btn-lg btn-block">Submit</button>

        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        }
    }
</script>