class SongsController < ApplicationController
  before_action :set_playlist, only: [:create, :show, :edit, :update, :destroy]
  before_action :set_songs, only: [:show, :edit, :update, :destroy]

  def index
    @songs = @playlist.songs
  end

  def new
    @song = @playlist.songs.build
  end

  def create
    @song = @playlist.songs.build(song_params)
    @song.user = current_user
    if @song.save
      respond_to do |format|
        format.js
      end
    end
  end

  def destroy
    if (@song.user == current_user) || (@song.playlist.user == current_user)
      @song.destroy
      if @song.destroyed?
        respond_to do |format|
        format.js
        end
      end
    end
  end

  private

  def set_songs
    @song = @playlist.songs.find(params[:id])
  end

  def set_playlist
    @playlist = Playlist.find(params[:playlist_id])
  end

  def song_params
    params.require(:song).permit(
      :title,
      :videoId
    )
  end

end
