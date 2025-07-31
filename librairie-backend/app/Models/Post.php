
// filepath: database/migrations/xxxx_xx_xx_xxxxxx_create_posts_table.php
public function up()
{
    Schema::create('posts', function (Blueprint $table) {
        $table->id();
        $table->string('title');
        $table->text('content');
        $table->timestamps();
    });
}

public function down()
{
    Schema::dropIfExists('posts');
}