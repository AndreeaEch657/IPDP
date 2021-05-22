using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CyberShop.Data.Migrations
{
    public partial class AddPath : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "image",
                table: "ShopItemsImages");

            migrationBuilder.AddColumn<string>(
                name: "image_path",
                table: "ShopItemsImages",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "image_path",
                table: "ShopItemsImages");

            migrationBuilder.AddColumn<byte[]>(
                name: "image",
                table: "ShopItemsImages",
                type: "varbinary(max)",
                nullable: true);
        }
    }
}
